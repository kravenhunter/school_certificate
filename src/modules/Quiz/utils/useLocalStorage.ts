declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

const IS_SERVER = typeof window === "undefined";
//Утилита сохранения и избятия данных из loacl-storage
export function useLocalStorage<T>(key: string): [() => T | null, (value: T) => void, () => void] {
  //установили флаг что есть какойто объект  init

  //Сенриализует объект в строку
  const serializer = (value: T): string => JSON.stringify(value);
  // Десиреализует строку в объект
  const deserializer = (value: string): T => {
    // Support 'undefined' as a value
    if (value === "undefined") {
      return undefined as unknown as T;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return undefined as unknown as T; // Return initialValue if parsing fails
    }

    return parsed as T;
  };

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T | null => {
    // Prevent build error "window is undefined" but keep working
    if (IS_SERVER) {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
      return null;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  };

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      // Save to local storage
      window.localStorage.setItem(key, serializer(value));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(`Tried removing localStorage key “${key}” even though environment is not a client`);
    }
    try {
      // Remove the key from local storage
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [readValue, setValue, removeValue];
}

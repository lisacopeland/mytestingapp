export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export class User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

  constructor(defaultValues: Partial<User>) {
    Object.keys(defaultValues).forEach((key) => {
      this[key] = defaultValues[key];
    });
  }

  clone() {
    return new User(deepCopy(this));
  }
}
export function mapToUser(data: any): User {
  return new User(data);
}
export function mapToUsers(data: any[]): User[] {
  if (data !== undefined && data.length) {
    const allData = data.map(mapToUser);
    return allData;
  } else {
    return [];
  }
}

import {
  setItemAsync,
  getItemAsync,
  deleteItemAsync,
  isAvailableAsync,
} from "expo-secure-store";
import Domain from "./domain";

async function save(key: string, value: string) {
  return await setItemAsync(key, value);
}
async function getValueFor(key: string) {
  return await getItemAsync(key);
}
async function deleteValueFor(key: string) {
  return await deleteItemAsync(key);
}
async function checkDB() {
  return await isAvailableAsync();
}

async function _fetch(token: string, url: string) {
  const login = await fetch(`${url}/api/admin/logStatus`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `adtoken=${token}`,
    },
    credentials: "include",
  });
  if (login.status === 200) {
    return true;
  } else {
    return false;
  }
}

async function checkToken(url: string) {
  const token = await getValueFor("adtoken");
  if (!token) {
    return false;
  }
  const result = await _fetch(token, url);
  return result;
}

export default async function CheckLogin(
  key?: string,
  value?: string,
  data?: any,
  callback?: any
) {
  try {
    const url = Domain();
    if (await checkDB()) {
      if (key && value) {
        try {
          await save(key, value);
          return false;
        } catch (error) {
          return true;
        }
      } else if (data) {
        if (!data) {
          return false;
        }
        const token = await getValueFor("adtoken");
        if (!token) {
          return false;
        }
        const login = await fetch(`${url}/api/admin/exams/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: `adtoken=${token}`,
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
        if (login.status === 200) {
          return true;
        } else {
          return false;
        }
      } else if (callback) {
        if (!callback) {
          return false;
        }
        const token = await getValueFor("adtoken");
        if (!token) {
          return false;
        }
        const login = await fetch(`${url}/api/admin/messages`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: `adtoken=${token}`,
          },
          credentials: "include",
        });
        if (login.status === 200) {
          return await login.json();
        } else {
          return false;
        }
      } else {
        return await checkToken(url);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

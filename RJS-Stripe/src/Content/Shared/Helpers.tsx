import { auth } from "../../API/FirebaseConfig"
const API = "http://localhost:3333"

// Helper function to fetch data from your API.
export const fetchFromAPI = async (endpointURL: string, opts?: any) => {
  const { method, body } = { method: "POST", body: null, ...opts } as any
  const user = auth.currentUser
  const token = user && (await user.getIdToken())

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export const axiosHeaders = {
  Authorization: `Bearer ${"sk_test_51HcZzoGN8FXEZpFVV7hr7blPRWL7d8hMhzbVFsqR0L5i1URcldZhOgUY6BSXNVVXRHVPpJpUSHowxaCkgyGe8C4N00gafFYG2G"}`,
}

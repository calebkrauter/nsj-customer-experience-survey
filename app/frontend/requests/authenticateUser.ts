
export async function authenticateUser(auth: unknown) {
  try {
    
      const response = await fetch('/api/post-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      });

      if (!response.ok) throw new Error("Data didn't fetch");
      const data = await response.json();
      return data.authenticated;
    } catch (error) {
      return false
    }
}
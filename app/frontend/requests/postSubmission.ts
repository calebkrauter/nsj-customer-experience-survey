export async function postSubmission(submission: unknown) {
  try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });
      if (!response.ok) throw new Error("Data didn't fetch");
      console.log(response.json());
      return response.ok;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
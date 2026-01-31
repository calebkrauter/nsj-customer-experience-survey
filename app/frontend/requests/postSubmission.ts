export async function postSubmission(submissionData: unknown) {
  try {
      const response = await fetch('api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': 'mock-API-Key',
        },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) throw new Error("Data didn't fetch");
      console.log(response.json());
    } catch (error) {
      console.log(error);
    }
}
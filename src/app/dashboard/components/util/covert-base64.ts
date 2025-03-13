 /**
   * Converts a file to a Base64-encoded string.
   * @param file - The file to convert.
   * @returns A promise that resolves to the Base64-encoded string.
   */
 const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to Base64.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error reading the file.'));
      };
      reader.readAsDataURL(file);
    });
  };
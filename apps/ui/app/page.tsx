'use client';

import { useState } from 'react';

interface FormState {
  language: string;
  options: string[];
  code: string;
}

export default async function Index() {
  const [formState, setFormState] = useState<FormState>({
    language: '',
    options: [],
    code: '',
  });

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      language: event.target.value,
    }));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormState((prevState) => {
      let updatedOptions: string[] = [];
      if (checked) {
        updatedOptions = [...prevState.options, value];
      } else {
        updatedOptions = prevState.options.filter((option) => option !== value);
      }
      return {
        ...prevState,
        options: updatedOptions,
      };
    });
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      code: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the form data
    console.log('Form Data:', formState);
    // Reset form
    setFormState({
      language: '',
      options: [],
      code: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={formState.language}
          onChange={handleLanguageChange}
          required
        >
          <option value="">Select a language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="ruby">Ruby</option>
          <option value="csharp">C#</option>
        </select>
      </div>

      <div>
        <fieldset>
          <legend>Options:</legend>
          <label>
            <input
              type="checkbox"
              value="option1"
              onChange={handleOptionChange}
            />
            Option 1
          </label>
          <label>
            <input
              type="checkbox"
              value="option2"
              onChange={handleOptionChange}
            />
            Option 2
          </label>
          <label>
            <input
              type="checkbox"
              value="option3"
              onChange={handleOptionChange}
            />
            Option 3
          </label>
          <label>
            <input
              type="checkbox"
              value="option4"
              onChange={handleOptionChange}
            />
            Option 4
          </label>
          <label>
            <input
              type="checkbox"
              value="option5"
              onChange={handleOptionChange}
            />
            Option 5
          </label>
        </fieldset>
      </div>

      <div>
        <label htmlFor="code">Code:</label>
        <textarea
          id="code"
          value={formState.code}
          onChange={handleCodeChange}
          required
        ></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

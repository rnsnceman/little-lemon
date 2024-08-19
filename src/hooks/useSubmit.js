import {useState} from "react";

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (submitAPI, data) => {
    setLoading(true);
    try {
      if (submitAPI(data) === false) throw Error;

      setResponse({
        type: 'success',
        title: 'Thank you for booking',
        message: `Your table is reserved for ${data.time}! See you then.`,
        bgColor: '#EEEFEE'
      })
    } catch (error) {
      setResponse({
        type: 'error',
        title: 'Oops',
        message: 'Something went wrong, please try again later!',
        bgColor: 'red'
      })
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, setResponse, submit };
}

export default useSubmit;

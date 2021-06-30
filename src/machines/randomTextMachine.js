import { Machine, send, assign } from "xstate";
import { useMachine } from "@xstate/react";

const RANDOM_TEXT_URL = "https://baconipsum.com/api/?type=meat-and-filler";

const fetchRandomTexts = async () => {
  const response = await fetch(RANDOM_TEXT_URL);
  const data = await response.json();
  return data;
};

const setTexts = assign({
  texts: (context, event) => event.data || context.texts
});

const setError = assign({
  error: (context, event) => {
    console.log(event.data.message);
    return event.data.message;
  }
});

const clearError = assign({
  error: null
});

const randomTextsMachine = Machine(
  {
    id: "randomTextMachine",
    type: "parallel",
    context: {
      texts: [],
      error: null
    },
    states: {
      loadingTexts: {
        initial: "idle",
        states: {
          idle: {
            on: {
              SHOW_LOADING: "loading"
            }
          },
          loading: {
            on: {
              HIDE_LOADING: "idle"
            }
          }
        }
      },
      fetchTexts: {
        initial: "idle",
        states: {
          idle: {
            on: {
              FETCH_TEXTS: "fetching"
            }
          },
          fetching: {
            onEntry: ["clearError", send("SHOW_LOADING")],
            invoke: {
              src: fetchRandomTexts,
              onDone: "success",
              onError: "failure"
            }
          },
          success: {
            type: "final",
            onEntry: ["setTexts", send("HIDE_LOADING")],
            after: {
              1000: "idle"
            }
          },
          failure: {
            onEntry: ["setError", send("HIDE_LOADING")],
            on: {
              FETCH_TEXTS: "fetching"
            }
          }
        }
      }
    }
  },
  {
    actions: {
      setTexts,
      setError,
      clearError
    }
  }
);

export const useRandomTextMachine = (options = { devTools: true }) =>
  useMachine(randomTextsMachine, options);

export default randomTextsMachine;

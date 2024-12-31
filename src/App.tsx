import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db/db";
import { useState } from "react";
import { Task } from "./models/task";

function App() {
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const [input, setInput] = useState("");

  const addTask = async () => {
    try {
      await db.tasks.add({ text: input, completed: false });
      setInput("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    await db.tasks.update(task.id, { completed: !task.completed });
  };

  return (
    <>
      <main className="container mx-auto">
        <div className="p-2 flex gap-2 items-center bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="grow"
          />
          <button
            className="shrink-0 px-4 py-2 bg-green-700 text-white font-semibold"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="p-2">
          {tasks?.map((task, index) => (
            <li key={index} className={task.completed ? "line-through" : ""}>
              <span onClick={() => toggleTaskCompletion(task)}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;

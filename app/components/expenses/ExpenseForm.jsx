import {
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
  // useSubmit
} from "@remix-run/react";
import ExpensesIDPage from "~/routes/__expenses/expenses/$ID/_Id";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validateError = useActionData();
  // const expenseIdData = useLoaderData();
  const params = useParams();
  const matches = useMatches();
  const expenses = matches.find(
    (d) => d.id === "routes/__expenses/expenses/_layout"
  ).data;
  const expenseIdData = expenses.find((exp) => exp.id === params.ID);
  const navigation = useNavigation();
  const isSubmit = navigation.state !== "idle";
  
  if(params.ID && !expenseIdData){
    return <p> Invalid expenses Id </p>
  }

  const defaultValue = expenseIdData
    ? {
        title: expenseIdData.title,
        amount: expenseIdData.amount,
        date: expenseIdData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  // const submit = useSubmit()

  // function handleSubmit(e){
  //   e.preventDefault();
  //   // perform some validation or other things
  //   submit(e.target, {
  //     // action: '/expenses/add',
  //     method: 'post'
  //   })
  // }

  return (
    <form
      method={expenseIdData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValue.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            defaultValue={
              defaultValue.date ? defaultValue.date.slice(0, 10) : ""
            }
            required
          />
        </p>
      </div>
      {validateError && (
        <ul>
          {Object.values(validateError).map((err) => (
            <li key={err}>
              {console.log("error", err)}
              {err.amount}
            </li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmit}>
          {isSubmit ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </form>
  );
}

export default ExpenseForm;

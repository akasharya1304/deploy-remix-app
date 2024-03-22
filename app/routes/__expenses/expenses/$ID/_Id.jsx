import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpenseById, getExpenseDeleteById, getExpenseUpdateById } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesIDPage() {
  const navigation = useNavigate();
  function closeHandle() {
    navigation("..");
  }
  return (
    <Modal onClose={closeHandle}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({params}){
//   const expenseId = params.ID;
//   const data = getExpenseById(expenseId)
//   return data;
// }

export async function action({ params, request }) {
  const expenseId = params.ID;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      throw error;
    }

    await getExpenseUpdateById(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await getExpenseDeleteById(expenseId)
    return redirect('/expenses')
  }
}

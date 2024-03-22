import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpenses } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesAdd() {
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

export async function action({ request }) {
  const userId = await requireUserSession(request)
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  // console.log("line 111", formData, expenseData);
``
  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    throw error;
  }

  await addExpenses(expenseData, userId);
  return redirect("/expenses");
}

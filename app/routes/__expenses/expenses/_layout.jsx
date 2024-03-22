import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesPage() {
  const expenses = useLoaderData()
  const hasExpenses = expenses && expenses.length > 0
  // console.log(expenses)
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
      </main>
      <main>
      {hasExpenses
        ? <ExpensesList expenses={expenses} />
        : <section id="no-expenses">
          <h1> No expenses Found</h1>
          <p>
            Start <Link to="add">Adding Some </Link> today
          </p>
        </section>
      }
      </main>
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request)

  const expenses = await getExpenses(userId)
  return expenses;

  // not needed in this scenario as add button not shown
  // if(!expenses || expenses.length === 0){
  //   throw json(
  //     {message: 'Could not find any expense'},
  //     {sattus: 404, statusText: 'No Expense Found'},
  //   )
  // }
}

import { Link, useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesAnalysis() {
  const expenses = useLoaderData()

  const hasExpenses = expenses && expenses.length > 0

  return (
    <main>
    {hasExpenses
        ?<>
      <Chart expenses={expenses}/>
      <ExpenseStatistics expenses={expenses} />
      </>
      : <section id="no-expenses">
          <h1> No expenses Found for Analysis</h1>
          <p>
            Start <Link to="/expenses/add">Adding Some </Link> today
          </p>
        </section>
    }
    </main>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request)
  const expenses = await getExpenses(userId)
  return expenses;
}
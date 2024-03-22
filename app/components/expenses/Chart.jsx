import ChartBar from './ChartBar';

function Chart({ expenses }) {
  const chartDataPoints = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 10 },
    { label: 'Mar', value: 10 },
    { label: 'Apr', value: 10 },
    { label: 'May', value: 10 },
    { label: 'Jun', value: 10 },
    { label: 'Jul', value: 10 },
    { label: 'Aug', value: 10 },
    { label: 'Sep', value: 10 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 10 },
    { label: 'Dec', value: 10 },
  ];

  for (const expense of expenses) {
    const expenseMonth = new Date(expense.date).getMonth(); // starting at 0 => January => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <section>
      <h2>Monthly Expenses</h2>
      <ol className='chart'>
        {chartDataPoints.map((dataPoint) => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))}
      </ol>
    </section>
  );
}

export default Chart;

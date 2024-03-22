import { prisma } from "./database.server";

export async function addExpenses(expenseData,userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: {connect: { id: userId}}
      },
    });
  } catch (error) {
    throw new Error('failed to add expenses');
  }
}

export async function getExpenses(userId) {
  if(!userId){
    throw new Error('failed to get expenses list');
  }
  try {
    const expenseData =  await prisma.expense.findMany({
      where: {userId},
      orderBy: { date : 'desc'},
    })
    return expenseData
  } catch (error) {
    throw new Error('failed to get expenses list');
  }
}

export async function getExpenseById(id) {
  try {
    const expenseData =  await prisma.expense.findFirst({
      where: {id}
    })
    return expenseData
  } catch (error) {
    throw new Error('failed to get expenses');
  }
}

export async function getExpenseUpdateById(id, expenseData) {
  try {
    await prisma.expense.update({
      where: {id},
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    })
  } catch (error) {
    throw new Error('failed to update expenses');
  }
}

export async function getExpenseDeleteById(id) {
  try {
    await prisma.expense.delete({
      where: {id},
    })
  } catch (error) {
    throw new Error('failed to delete expenses');
  }
}

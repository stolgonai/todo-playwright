// import { test, expect } from "@playwright/test";
import { test, expect } from "../../fixtures/todo-fixture";

import { clickLink, clickButton } from "../../helpers/clickHelpers";
import { TodoPage } from "../../page/TodoPage";

test.describe("ToDo", () => {
    let todoPage: TodoPage
    const taskItems = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

    test.beforeEach(async ({ page }) => {
        await page.goto('https://techglobal-training.com/frontend')
        await clickLink(page, 'Project - Todo List')
    })
    test("Test Case 01: Todo-App Modal Verification", async ({todoPage, page }) => {

        await expect(page.getByText('My Tasks')).toBeVisible();
        await expect(todoPage.addInput).toBeEnabled()
        await expect(todoPage.adddBtn).toBeEnabled();
        await expect(todoPage.searchInput).toBeEnabled();
        await expect(todoPage.todoItemContainer).toBeVisible();
    })

    test('Test Case 02: Single Task Addition and Removal', async ({ todoPage, page }) => {
        await todoPage.addTodo('My Item')
        await expect(page.locator('.mr-auto')).toContainText(['My Item'])
        await expect(page.locator('.mr-auto')).toHaveCount(1)
        await todoPage.select()
        // await todoPage.remove('My Item')

        const deleteItem = page.locator('.destroy')
        const isDeleteVisible = await deleteItem.isVisible()

        if(deleteItem) {
            await deleteItem.click()
        }

        // await expect(todoPage.todoItemContainer).toBeVisible();
        await expect(todoPage.todoItemContainer).toHaveText('No task found!')


    })

    test('Test Case 03 - Multiple Task Operations', async ({todoPage, page}) => {

        const taskItemCont = page.locator('.mr-auto')
       for(let i = 0; i < taskItems.length; i++){
        await todoPage.addTodo(taskItems[i])
       }
  
        await expect(taskItemCont).toHaveText(taskItems)

        for (let i = 0; i < await taskItemCont.count(); i++) {
          await taskItemCont.nth(i).click();
        }

        await todoPage.butnClearAll.click()
        // await clickButton(page, 'Project - Todo List')
        await expect(todoPage.todoItemContainer).toHaveText('No task found!')

    })

  test('Test Case 04 - Search and Filter Functionality in todo App',  async ({todoPage, page}) => {
    const taskItemCont = page.locator('.mr-auto')
       for(let i = 0; i < taskItems.length; i++){
        await todoPage.addTodo(taskItems[i])
       }
  
        await expect(taskItemCont).toHaveText(taskItems)
        
        const lastAdded = taskItems[taskItems.length-1]

        await todoPage.searchInput.fill(lastAdded)

        await expect(taskItemCont).toHaveText(lastAdded)

        await expect(taskItemCont).toHaveCount(1)

  })

  test('Test Case 05 - Task Validation and Error Handling', async ({todoPage, page}) => {
    let text = "My Item"
    await todoPage.addInput.fill("")
    await expect(todoPage.todoItemContainer).toHaveText('No task found!')
    await todoPage.addTodo("qwertyuiopasdfghjklzxcvbnmqwerhgfdfghj")
    await expect(todoPage.dangeressage).toHaveText("Error: Todo cannot be more than 30 characters!")
    await todoPage.addTodo(text)
    await expect(todoPage.oneItem).toHaveCount(1)
    await todoPage.addTodo(text)
    await expect(todoPage.dangeressage).toContainText(`Error: You already have ${text} in your todo list`)

  })

})
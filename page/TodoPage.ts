import { type Locator, type Page } from '@playwright/test'

export class TodoPage {

    readonly page: Page
    readonly addInput: Locator
    readonly searchInput: Locator
    readonly adddBtn: Locator
    readonly todoItemContainer: Locator
    readonly oneItem: Locator
    readonly butnClearAll: Locator
    readonly dangeressage: Locator

    constructor(page: Page) {
        this.page = page
        this.addInput = page.locator('#input-add')
        this.searchInput = page.locator('#search')
        this.adddBtn = page.locator('#add-btn')
        this.todoItemContainer = page.locator('.has-text-danger')
        this.oneItem = page.locator('.mr-auto')
        this.butnClearAll = page.locator('#clear')
        this.dangeressage = page.locator('.is-danger')

    }

    async goto() {
        await this.page.goto('https://techglobal-training.com/frontend/project-6')
      }
      async addTodo(text: string) {
        await this.addInput.fill(text)
        await this.addInput.press('Enter')
      }
    
      async select() {
       
        const isTaskVisible = await this.oneItem.isVisible()
        
        if(isTaskVisible) {
            await this.oneItem.click()
            // await taskContainer.
        }
        const checkMarked = await this.oneItem.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('text-decoration')
        })
      }

      async remove(text: string) {
        const todo = this.todoItemContainer.filter({ hasText: text })
        await todo.hover()
    
        await todo.locator('.destroy').click()
      }
    
}

export class Todo {
  static #list = []
  static #count = 0

  static #createTaskData = (text) => {
    this.#list.push({
      id: ++this.#count,
      text,
      done: false,
    })
  }

  static #block = null
  static #template = null
  static #input = null
  static #button = null

  static init = () => {
    this.#template =
      document.getElementById(
        'task',
      ).content.firstElementChild

    this.#block = document.querySelector('.task_list')

    this.#input = document.querySelector('.form_input')

    this.#button = document.querySelector('.form_button')

    this.#button.onclick = this.#handleAdd
    this.#render()
  }

  static #handleAdd = () => {
    const value = this.#input.value
    if (value.length > 1) {
      this.#createTaskData(value)
      this.#input.value = ''
      this.#render()
    }
  }

  static #render = () => {
    this.#block.innerHTML = ''

    if (this.#list.length === 0) {
      this.#block.innerText = `Список задач пустий`
    } else {
      this.#list.forEach((taskData) => {
        const el = this.#createTaskElem(taskData)
        this.#block.apennd(el)
      })
    }
  }

  static #createTaskElem = (data) => {
    const el = this.#template.cloneNode(true)

    const [id, text, btnDo, btnCancel] = el.children

    id.innerText = `${data.id}.`

    text.innerText = data.text

    btnCancel.onclick = this.#handleCancel(data)

    btnDo.onclick = this.#handleDo(data, btnDo, el)

    return el
  }

  static #handleDo = (data, btn, el) => () => {
    const result = this.#toggleDone(data.id)
    if (result === true || result === false) {
      el.classList.toggle('task--done')
      btn.classList.toggle('task_button--do')
      btn.classList.toggle('task_button--done')
    }
  }

  static #toggleDone = (id) => {
    const task = this.#list.find((item) => item.id === id)
    if (task) {
      task.done = !task.done
      return task.done
    } else {
      return null
    }
  }

  static #handleCancel = (data) => () => {
    if (confirm('Видалити задачу?')) {
      const result = this.#deleteById(data.id)
      if (result) this.#render()
    }
  }

  static #deleteById = (id) => {
    this.#list = this.#list.filter((item) => item.id !== id)
    return true
  }
}
Todo.init()
window.todo = Todo

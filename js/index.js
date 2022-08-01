// prompts
document.querySelector('#checkbox-input').addEventListener('click', () => {
  document.querySelector('#draggable-list').classList.toggle('display--prompts')
})


// draggable list 
const wealthiestPeopleList = [
  {name: 'Elon Musk', welth: '$230.4 billion'},
  {name: 'Bernard Arnault & family', welth: '$148.5 billion'},
  {name: 'Jeff Bezos', welth: '$139.5 billion'},
  {name: 'Gautam Adani & family', welth: '$114.5 billion'},
  {name: 'Bill Gates', welth: '$102.4 billion'},
  {name: 'Larry Ellison', welth: '$96.8 billion'},
  {name: 'Warren Buffett', welth: '$96.0 billion'},
  {name: 'Larry Page', welth: '$94.5 billion'},
  {name: 'Sergey Brin', welth: '$90.9 billion '},
  {name: 'Mukesh Ambani', welth: '$88.3 billion'}
]

const itemsList = []

let startIndex
let oldElement

const draggableList = document.querySelector('#draggable-list')
const checkBtn = document.querySelector('#check-btn')

function createListItems() {
  [...wealthiestPeopleList]
  .map( p => ({ name: p.name, welth: p.welth, sort: Math.random() }) )
  .sort( (p1, p2) => p2.sort - p1.sort ) // sorts by ascending order by specific object field
  .map( p => ({ name: p.name, welth: p.welth }) )
  .forEach((person, index) => {
    const listItem = document.createElement('li')
    listItem.classList.add('draggable-list-item')

    listItem.setAttribute('data-index', index)

    listItem.innerHTML = `
      <span class="item-number">${index + 1}</span>
      <div class="item-body" id="item-body" draggable="true">
        <div class="name">
          <i class="fa-solid fa-id-card"></i>
          <span>${person.name}</span>
        </div>
        <div class="wealth">
          <i class="fa-solid fa-coins"></i>
          ${person.welth}
        </div>
        <i class="fa-solid fa-grip-lines"></i>
      </div>
    `
    draggableList.appendChild(listItem)
    itemsList.push(listItem)
  })

  addEventListeners()
}

// listeners
function dragStart(e) {
  startIndex = this.closest('.draggable-list-item').getAttribute('data-index')
  this.style.opacity = '0.5'
  const dt = e.dataTransfer
  dt.effectAllowed = 'move'

  itemsList.forEach(item => {
    item.classList.remove('item-body--wrong')
    item.classList.remove('item-body--correct')
  })
}
function dragEnd() {
  if ( !oldElement ) return

  this.style.opacity = '1'
  oldElement.element.classList.remove('item-body--over')
  startIndex = undefined
}

function drop(e) {
  if ( !startIndex ) return

  endIndex = this.getAttribute('data-index')

  swap(startIndex, endIndex)
}

function dragEnter(e) {
  if ( startIndex === undefined ) return
  
  if( !oldElement) {
    this.classList.add('item-body--over')
    oldElement = { 
      element: this,
      index: this.getAttribute('data-index')
    }
  }
  
  if ( oldElement.index !== this.getAttribute('data-index') ) {
    oldElement.element.classList.remove('item-body--over')
    this.classList.add('item-body--over')

    oldElement.index = this.getAttribute('data-index')
    oldElement.element = this
  }
}
function dragOver(e) {
  e.preventDefault()
}


// functional
function addEventListeners() {
  const itemBody = document.querySelectorAll('#item-body')
  const dragListItems = document.querySelectorAll('#draggable-list li')
  
  
  itemBody.forEach(i => {
    i.addEventListener('dragstart', dragStart)
    i.addEventListener('dragend', dragEnd)
  })
  dragListItems.forEach(i => {
    i.addEventListener('dragover', dragOver)
    i.addEventListener('drop', drop)
    i.addEventListener('dragenter', dragEnter)
  })
}

function swap(startIndex, endIndex) {
  firstItem = itemsList[startIndex].querySelector('.item-body')
  secondItem = itemsList[endIndex].querySelector('.item-body')


  itemsList[endIndex].appendChild(firstItem)
  itemsList[startIndex].appendChild(secondItem)
}

// check order
document.querySelector('#check-btn').addEventListener('click', e => {

    itemsList.forEach( (item, index) => {
      const name  = item.querySelector('.name span').innerText.trim() // trim removes white spaces from the end and from beginning of the string

      if ( name === wealthiestPeopleList[index].name ) {
        item.classList.add('item-body--correct')
      } else {
        item.classList.add('item-body--wrong')
      }
    })

  }
)

// main
createListItems()
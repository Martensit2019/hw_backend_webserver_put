document.addEventListener('click', ({ target }) => {
  const currentEl = target.closest('li')
  const type = target.dataset.type
  if (type === 'update') {
    visibleCurrentEl(currentEl)
    hiddenNextEl(currentEl)
  }
  if (type === 'remove') {
    const id = target.dataset.id
    remove(id).then(() => {
      target.closest('li').remove()
    })
  }
  if (type === 'edit') {
    const id = target.dataset.id
    editTitle(id, currentEl)
  }
  if (type === 'cancel') {
    visibleCurrentEl(currentEl)
    hiddenPrevEl(currentEl)
  }
})

function editTitle(id, currentEl) {
  const currentTitle = currentEl.previousElementSibling.querySelector('span').textContent
  newTitle = currentEl.querySelector('input').value.trim()
  if (newTitle === '' || newTitle === null) {
    alert('Обновлённое название задачи не может быть пустым')
    return
  }
  if (currentTitle === newTitle) {
    visibleCurrentEl(currentEl)
    hiddenPrevEl(currentEl)
    return
  }
  update(id, newTitle).then(() => {
    currentEl.previousElementSibling.querySelector('span').textContent = newTitle
    visibleCurrentEl(currentEl)
    hiddenPrevEl(currentEl)
  })
}

function inputKeyup({ target, key }) {
  if (key === 'Enter') {
    const currentEl = target.closest('li')
    const id = currentEl.querySelector('button').dataset.id
    editTitle(id, currentEl)
  }
}

function visibleCurrentEl(el) {
  el.classList.add('d-none')
}

function hiddenNextEl(el) {
  el.nextElementSibling.classList.remove('d-none')
}
function hiddenPrevEl(el) {
  el.previousElementSibling.classList.remove('d-none')
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  })
}
async function update(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

document.querySelector("#add-time")
.addEventListener('click', cloneField)

function cloneField() {
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true) // cloneNode está ligado ao elemnto HTML
    const fields = newFieldContainer.querySelectorAll("input")
    fields.forEach(function(field) {
        fields.value=""
    })
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}
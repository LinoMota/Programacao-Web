const upper = _ => String(_).toUpperCase()
const lower = _ => String(_).toLowerCase()

const showError = function (errors, field) {
    let mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            if (error.path == field) {
                console.log(field)
                mensagem = error.message;
                return;
            }
        });
        return mensagem;
    }
}

module.exports = {
    upper,
    lower,
    showError
}
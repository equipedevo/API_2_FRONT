export default function mudarNome()
{
    document.querySelector('#arquivo').addEventListener('change', function() {
        document.querySelector('.nomeArquivo').textContent = this.files[0].name;
    })
}

async function buscarDadosCEP(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }
      document.getElementById('endereco').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('municipio').value = data.localidade;
      document.getElementById('estado').value = data.uf;
    } catch (error) {
      alert("Erro ao buscar o CEP!");
      console.error("Erro:", error);
      document.getElementById('endereco').removeAttribute('disabled');
      document.getElementById('bairro').removeAttribute('disabled');
      document.getElementById('municipio').removeAttribute('disabled');
      document.getElementById('estado').removeAttribute('disabled');
    }
  }

document.getElementById('cep').addEventListener('blur', function() {
  const cep = this.value.replace(/\D/g, ''); 
  if (cep.length === 8) { 
      buscarDadosCEP(cep);
  } else {
      alert("CEP inválido!");
  }
});



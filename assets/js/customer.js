document.getElementById('salvar-fornecedor').addEventListener('click', function() {
  const form = document.getElementById('form-fornecedor');
  const fornecedor = {
    razaoSocial: form['razao-social'].value,
    cnpj: form['cnpj'].value,
    nomeFantasia: form['nome-fantasia'].value,
    inscricaoEstadual: form['inscricao-estadual'].value,
    inscricaoMunicipal: form['inscricao-municipal'].value,
    nomePessoaContato: form['nome-pessoa-contato'].value,
    telefone: form['telefone'].value,
    email: form['email'].value
  };

  const produtos = JSON.parse(sessionStorage.getItem('produtos')) || [];
  const anexos = JSON.parse(sessionStorage.getItem('anexos')) || [];

  const dadosCompletos = {
    ...fornecedor,
    produtos: produtos,
    anexos: anexos
  };

  alert('Dados salvos com sucesso.');

  $('#jsonDisplay').text(JSON.stringify(dadosCompletos, null, 2));
  $('#jsonModal').fadeIn();
});

$(document).on('click', '.close', function() {
  $('#jsonModal').fadeOut();
});

$('#close').on('click', function() {
  $('#jsonModal').fadeOut();
});

$(window).on('click', function(event) {
  if ($(event.target).is('#jsonModal')) {
    $('#jsonModal').fadeOut();
  }
  
});
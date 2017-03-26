angular.module('starter.services', [])

.factory('Funcionarios',function() {
  // Might use a resource here that returns a JSON array
   

  return {
    all: function() {
      return funcionarios;
    },
    remove: function(funcionario) {
      funcionarios.splice(funcionarios.indexOf(funcionarios), 1);
    },
    get: function(funcionarioId) {
      for (var i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].id === parseInt(funcionarioId)) {
          return funcionarios[i];
        }
      }
      return null;
    }
  };
});
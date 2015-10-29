(function($){
	$(document).ready(function(){

		var ultimoContato = 0;
		$.ajax({
		    url: '/static/json/talk.json',
		    success: function(data) {
		    	$('.geral').append('<div class="header"><p>Vaga: Desenvolvedor Front-end <span class="fecharJanela"></span><span id="janelaTamanho" class="resizeJanela"></span></p></div>');
		    	$('.geral').append('<div class="container-chat clearfix "></div>');
		    	for (var i = 0; i < data.talkMessages.length; i++) {//Percorre o Json
		    		var dataDeEnvio = new Date(data.talkMessages[i].message.time);//Geral uma nova data usando o valor do json
		    		var horas = dataDeEnvio.getHours() ;//Pega somente a hora
		    		var minutos = dataDeEnvio.getMinutes() ;//Pega somente os minutes
		    		if(ultimoContato != data.talkMessages[i].user.id){
		    			if(data.talkMessages[i].company){//Se dentro do objeto tiver o company, ele cria a estrutura para as mensagens do recrutador
							$('.container-chat').append('<div class="containerconversas clearfix">\
																<div class="containerImagemChat pull-left recruta">\
																	<img src="/static/images/imagensChat/recrutador.png" class="center-block imagemAvatarChat"/>\
																</div>\
																<div class="todasAsMensagens todasRecrutador clearfix">\
																	<div class="containerChatRecrutador pull-left">\
																		<span class="setaBoxRecrutador"></span>\
																		<div class="pull-right">'+data.talkMessages[i].message.message +'</div>\
																		<div class="pull-left arealeft">\
																			<span class="nomeMensagem  cemPorCento text-left">'+data.talkMessages[i].user.name+'</span>\
																			<span class="nomeEmpresa cemPorCento text-left">'+data.talkMessages[i].company.name+'</span>\
																			<span class="statusDoEnvioTexto pull-left text-left">enviado as '+horas+'h'+ minutos+'</span>\
																		</div>\
																	</div>\
																</div>\
															</div>');
			    		}else{//Se não tiver o campo company ele cria a estrutura para o contratado
							$('.container-chat').append('<div class="containerconversas clearfix">\
															<div class="containerImagemChat pull-right cadit">\
																<img src="/static/images/imagensChat/candidato.png" class="center-block imagemAvatarChat">\
															</div>\
															<div class="todasAsMensagens todasCandidato clearfix">\
																<div class="containerChatCandidato nomeRecrutado pull-right">\
																	<span class="setaBoxCandidato"></span>\
																	<div class="pull-left">\
																		<span class="mensagemCandidato">'+data.talkMessages[i].message.message +'</span>\
																	</div>\
																	<div class="pull-left areaRight">\
																		<span class="nomeMensagem cemPorCento text-right">Você</span>\
																		<span class="statusDoEnvioTexto pull-right cemPorCento text-right">enviado as '+horas+'h'+ minutos+'</span>\
																	</div>\
																	<span class="relogioConfirmacao"><span>\
																</div>\
															</div>\
														</div>');
			    			}
			    		if(data.talkMessages[i].message.alreadyRead == true){//Verifica se a mensagem foi entregue/Lida
			    			$('.relogioConfirmacao').addClass('mensagemEntregue');//se foi entregue ele adiciona a class com o relogio azul de entregue e lido
			    		}else{
			    			$('.relogioConfirmacao').addClass('mensagemAguardando');//Se ainda não foi entregue, ele adiciona a class com o relogio aguardando
			    		}
		    		}else{
		    				var divMensagem = '';
		    				if(data.talkMessages[i].company){
		    					divMensagem = '<div class="containerChatRecrutador pull-left marginMensagem">\
													<span class="setaBoxRecrutador"></span>\
													<div class="pull-right">'+data.talkMessages[i].message.message +'</div>\
													<div class="pull-left arealeft">\
														<span class="nomeMensagem  cemPorCento text-left">'+data.talkMessages[i].user.name+'</span>\
														<span class="nomeEmpresa cemPorCento text-left">'+data.talkMessages[i].company.name+'</span>\
														<span class="statusDoEnvioTexto pull-left text-left">enviado as '+horas+'h'+ minutos+'</span>\
												</div>';
		    				}else{
		    					divMensagem = '<div class="containerChatCandidato nomeRecrutado pull-right marginMensagem">\
													<span class="setaBoxCandidato"></span>\
													<div class="pull-left">\
														<span class="mensagemCandidato">'+data.talkMessages[i].message.message +'</span>\
													</div>\
														<div class="pull-left areaRight">\
															<span class="nomeMensagem cemPorCento text-right">Você</span>\
															<span class="statusDoEnvioTexto pull-right cemPorCento text-right">enviado as '+horas+'h'+ minutos+'</span>\
														</div>\
													<span class="relogioConfirmacao"><span>\
												</div>';
		    				}
		    				$('.containerconversas:last-child .todasAsMensagens').append(divMensagem);
		    				
		    		}
		    		ultimoContato = data.talkMessages[i].user.id;
		    		
	    		}
	    		$('.geral').append('<span id="divisoria" class="divisoria">');
	    		$('.geral').append('<textarea name="mensagem" id="" cols="30" rows="10" placeholder="Digite sua mensagem..."></textarea>');//Logo após construir o chat com as mensagens ele adiciona o campo textarea para digitar a mensagem
	    		$('textarea').keyup(function(e) {
				    if (e.keyCode == '13') {
				    	var horaEnviado = new Date()
				    	horaEnviado = horaEnviado.getHours();
				    	var minutosEnviado = new Date();
				    	minutosEnviado = minutosEnviado.getMinutes();
				    	var mensagemTextArea = $('textarea').val();
				    	if($('.containerconversas:last-child .containerChatCandidato') .length >0){
				    		$('.containerconversas:last-child  .todasAsMensagens').append('<div class="containerChatCandidato nomeRecrutado marginDigitado pull-right">\
									<span class="setaBoxCandidato"></span>\
									<div class="pull-left">\
										<span class="mensagemCandidato">'+mensagemTextArea+'</span>\
									</div>\
									<div class="pull-left areaRight ">\
										<span class="nomeMensagem cemPorCento text-right">Você</span>\
										<span class="statusDoEnvioTexto pull-right cemPorCento text-right">enviado as '+horaEnviado+'h'+minutosEnviado+'</span>\
									</div>\
									<span  class="mensagemAguardando marcar"><span>\
								</div>');
				    		
					       setTimeout(function() {
					       		$('.marcar').removeClass('mensagemAguardando');
					       		$('.marcar').addClass('mensagemEntregue');
					       	}, 1000);
				    	}else{
					       $('.container-chat').append('<div class="containerconversas marginDigitado clearfix">\
								<div class="containerImagemChat pull-right cadit">\
									<img src="/static/images/imagensChat/candidato.png" class="center-block imagemAvatarChat">\
								</div>\
								<div class="todasAsMensagens todasRecrutado clearfix">\
									<div class="containerChatCandidato nomeRecrutado pull-right">\
										<span class="setaBoxCandidato"></span>\
										<div class="pull-left">\
											<span class="mensagemCandidato ">'+mensagemTextArea+'</span>\
										</div>\
										<div class="pull-left areaRight ">\
											<span class="nomeMensagem cemPorCento text-right">Você</span>\
											<span class="statusDoEnvioTexto pull-right cemPorCento text-right">enviado as '+horaEnviado+'h'+minutosEnviado+'</span>\
										</div>\
										<span  class="mensagemAguardando marcar"><span>\
									</div>\
								</div<\
							</div>');
					       setTimeout(function() {
					       		$('.marcar').removeClass('mensagemAguardando');
					       		$('.marcar').addClass('mensagemEntregue');
					       	}, 1000);
					     }

				       var rolagem = $('.container-chat ');
						rolagem.scrollTop(rolagem.prop("scrollHeight"));
						$('textarea').val('');
				    }
				  });
				
	    		$('#janelaTamanho').click(function(e){
	    			e.stopPropagation();
					$('.container-chat,textarea').slideToggle( "slow" );
					$(this).toggleClass('resizeJanela');
					$(this).toggleClass('maxiJanela');
					setTimeout(function() {
						$('#divisoria').toggleClass('removeHeight','addHeight');
					},500);	
				});
				
				
				$('.fecharJanela').click(function(){
					$('.geral').hide();
				});
		    },
		    error: function() {
		       
		    }
		});//Fecha Ajax

				

		
		
	});
})(jQuery);
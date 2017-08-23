function alertaOferta(input, val) {
	var imagenAnterior = document.getElementById('img_destino').src;
	if ((val / 1024) > 300) {
		document.getElementById('centralMensajes').innerHTML = '<div class="alert alert-danger">Esta imágen pesa mas de 300kb</div>';
		document.getElementById('file_url').value = ''
		$('#esconder').css("display", "none")
		document.getElementById('img_destino').src = imagenAnterior;
	} else {
		$('#esconder').css("display", "block")
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#img_destino').attr('src', e.target.result);
				document.getElementById('poder').style.display = 'block';
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
}
package co.frigorificosble.portal.service.dto;

import java.io.Serializable;

public class ProductDTO  implements Serializable {

	private int guiasAFavor ;
	private int marca;
	private String tipoProducto;
	
	public int getGuiasAFavor() {
		return guiasAFavor;
	}
	public void setGuiasAFavor(int guiasAFavor) {
		this.guiasAFavor = guiasAFavor;
	}
	public int getMarca() {
		return marca;
	}
	public void setMarca(int marca) {
		this.marca = marca;
	}
	public String getTipoProducto() {
		return tipoProducto;
	}
	public void setTipoProducto(String tipoProducto) {
		this.tipoProducto = tipoProducto;
	}

}

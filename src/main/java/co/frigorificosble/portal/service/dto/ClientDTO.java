package co.frigorificosble.portal.service.dto;

import java.io.Serializable;
import java.util.List;

public class ClientDTO implements Serializable {
	
	private int id;
	
	private String nombres;
	
	private String apellidos;
	
	private long numeroIdentificacion;
	
	private List<ProductDTO> productos;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public long getNumeroIdentificacion() {
		return numeroIdentificacion;
	}

	public void setNumeroIdentificacion(long numeroIdentificacion) {
		this.numeroIdentificacion = numeroIdentificacion;
	}

	public List<ProductDTO> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductDTO> productos) {
		this.productos = productos;
	}

		
}

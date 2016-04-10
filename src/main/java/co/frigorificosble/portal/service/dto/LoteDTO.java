package co.frigorificosble.portal.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class LoteDTO implements Serializable {
	
	private int id;
	
	private int machos;
	
	private int hembras;
	
	private ZonedDateTime fecha;
	
	private ZonedDateTime fechaOperacion;
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getMachos() {
		return machos;
	}

	public void setMachos(int machos) {
		this.machos = machos;
	}

	public int getHembras() {
		return hembras;
	}

	public void setHembras(int hembras) {
		this.hembras = hembras;
	}

	public ZonedDateTime getFecha() {
		return fecha;
	}

	public void setFecha(ZonedDateTime fecha) {
		this.fecha = fecha;
	}

	public ZonedDateTime getFechaOperacion() {
		return fechaOperacion;
	}

	public void setFechaOperacion(ZonedDateTime fechaOperacion) {
		this.fechaOperacion = fechaOperacion;
	}
	
	
}

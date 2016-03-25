package co.frigorificosble.portal.service.dto;

import java.io.Serializable;

public class AttributeDTO implements Serializable {

	private String name;
	private String data;

	public AttributeDTO(String name, String data) {
		super();
		this.name = name;
		this.data = data;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}

}

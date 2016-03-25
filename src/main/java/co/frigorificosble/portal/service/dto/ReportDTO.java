package co.frigorificosble.portal.service.dto;

import java.io.Serializable;
import java.util.List;

public class ReportDTO implements Serializable {

	private String resourcePath ;
	private List<AttributeDTO> attributes;
	private List<ParameterDTO> parameters;
	private String reportDataSourceName ;
	
	public String getResourcePath() {
		return resourcePath;
	}
	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}
	public List<AttributeDTO> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<AttributeDTO> attributes) {
		this.attributes = attributes;
	}
	public List<ParameterDTO> getParameters() {
		return parameters;
	}
	public void setParameters(List<ParameterDTO> parameters) {
		this.parameters = parameters;
	}
	public String getReportDataSourceName() {
		return reportDataSourceName;
	}
	public void setReportDataSourceName(String reportDataSourceName) {
		this.reportDataSourceName = reportDataSourceName;
	}


}

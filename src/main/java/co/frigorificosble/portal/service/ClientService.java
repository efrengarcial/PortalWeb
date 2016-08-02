package co.frigorificosble.portal.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import co.frigorificosble.portal.config.JHipsterProperties;
import co.frigorificosble.portal.service.dto.ClientDTO;
import co.frigorificosble.portal.service.dto.LoteDTO;
import co.frigorificosble.portal.service.dto.ReportDTO;

@Service
@Transactional(readOnly = true)
public class ClientService {

	private final Logger log = LoggerFactory.getLogger(UserService.class);

	@Inject
	private JHipsterProperties jHipsterProperties;

	@Inject
	private OAuth2RestOperations restTemplate;

	@Transactional(readOnly = true)
	public Optional<ClientDTO> getClient(long identificationNumber) {
		Optional<ClientDTO> client = Optional.empty();
		ClientDTO result=null;
		Map<String, String> params = new HashMap<String, String>();
		params.put("id", Long.toString(identificationNumber) );
		String getUri = jHipsterProperties.getFrigorificosBle().getHost()+  "api/cliente/{id}";
		try {
			result = restTemplate.getForObject( getUri, ClientDTO.class,params);
			client = Optional.of(result);
		}
		catch (final HttpClientErrorException e) {
			if (e.getStatusCode() != HttpStatus.NOT_FOUND){
				throw e;
			} 
		}
		
		return client;
	}
	
	/*@Transactional(readOnly = true)
	public ResponseEntity<byte[]>  getInvenMarcaDetallado(String tipoProducto, int marca) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("marca", Integer.toString(marca));
		params.put("tipoProducto", tipoProducto);
		String getUri = jHipsterProperties.getFrigorificosBle().getHost()+"api/cliente/{marca}/inventariomarca/{tipoProducto}";
		return  restTemplate.getForObject( getUri, ClientDTO.class,params);
	}*/

	@Transactional(readOnly = true)
	public ResponseEntity<byte[]>  generateReport(ReportDTO reportDTO) {
		String postUri = jHipsterProperties.getFrigorificosBle().getHost()+"api/SSRSReporting/generateReport";
		return restTemplate.postForEntity(postUri, reportDTO, byte[].class);
	}
	
	
	@Transactional(readOnly = true)
	public List<LoteDTO>  consultarLotes(String tipoProducto, int marca, boolean isRemarca,
			LocalDate fromDate, LocalDate toDate  ) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("marca", Integer.toString(marca));
		params.put("tipoProducto", tipoProducto);
		params.put("isRemarca", Boolean.toString(isRemarca));
		params.put("startDateString", fromDate.format(DateTimeFormatter.ISO_LOCAL_DATE));		
		params.put("endDateString", toDate.format(DateTimeFormatter.ISO_LOCAL_DATE));		
		
		
		String getUri = jHipsterProperties.getFrigorificosBle().getHost()+
				"api/cliente/{marca}/lotes/{tipoProducto}/remarca/{isRemarca}/daterange/{startDateString}/{endDateString}";
		return  restTemplate.getForObject( getUri, List.class, params);
	}
	
	@Transactional(readOnly = true)
	public List<LoteDTO>  consultarListaSacrificios(String tipoProducto,int marca,	LocalDate fromDate, LocalDate toDate  ) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("marca", Integer.toString(marca));
		params.put("tipoProducto", tipoProducto);
		params.put("startDateString", fromDate.format(DateTimeFormatter.ISO_LOCAL_DATE));		
		params.put("endDateString", toDate.format(DateTimeFormatter.ISO_LOCAL_DATE));		
		
		
		String getUri = jHipsterProperties.getFrigorificosBle().getHost()+
				"api/cliente/{marca}/listaSacrificio/{tipoProducto}/daterange/{startDateString}/{endDateString}";
		return  restTemplate.getForObject( getUri, List.class, params);
	}
}

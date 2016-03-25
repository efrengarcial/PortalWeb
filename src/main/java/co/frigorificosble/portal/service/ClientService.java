package co.frigorificosble.portal.service;

import java.util.HashMap;
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

	@Transactional(readOnly = true)
	public ResponseEntity<byte[]>  generateReport(ReportDTO reportDTO) {
		String postUri = jHipsterProperties.getFrigorificosBle().getHost()+"api/SSRSReporting/generateReport";
		return restTemplate.postForEntity(postUri, reportDTO, byte[].class);
	}
}

package co.frigorificosble.portal.web.rest;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import co.frigorificosble.portal.service.ClientService;
import co.frigorificosble.portal.service.dto.ClientDTO;

@RestController
@RequestMapping("/api")
public class ClientResource {

	   private final Logger log = LoggerFactory.getLogger(UserResource.class);
	   
	   @Inject
	   private ClientService clientService;
	   
	   /**
	     * GET  /client/{id}-> get client by identificationNumber.
	     */
	    @RequestMapping(value = "/client/{id}",
	        method = RequestMethod.GET,
	        produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<ClientDTO> getClient(@PathVariable("id") long identificationNumber) {
	        log.debug("REST request to get Client : {}", identificationNumber);
	        return clientService.getClient(identificationNumber)
	                .map(clientDTO -> new ResponseEntity<>(clientDTO, HttpStatus.OK))
	                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }
}
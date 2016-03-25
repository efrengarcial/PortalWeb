package co.frigorificosble.portal.web.rest;

import java.util.ArrayList;
import java.util.List;

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
import co.frigorificosble.portal.service.dto.AttributeDTO;
import co.frigorificosble.portal.service.dto.ClientDTO;
import co.frigorificosble.portal.service.dto.ParameterDTO;
import co.frigorificosble.portal.service.dto.ReportDTO;

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
	    
	    /**
	     * GET  /client/{marca}/inventariofrio/{tipoproducto} -> get report inventario frio.
	     */
	    @RequestMapping(value = "/client/{marca}/inventariofrio/{tipoProducto}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]> getReportInventarioFrio(@PathVariable("tipoProducto") String tipoProducto,
	    		@PathVariable("marca") int marca) {
	        log.debug("REST request to get report inventario frio : {}, {}", tipoProducto,marca);
	        ReportDTO reportDTO = new ReportDTO();
	    	reportDTO.setReportDataSourceName("InventarioFrioDetallado");
	    	reportDTO.setResourcePath("InventarioFrioCuartoFrioDetallado");
	    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
	    	parameters.add(new ParameterDTO("TipoProducto" ,tipoProducto) );
			reportDTO.setParameters(parameters );

			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("TipoProducto" ,tipoProducto));
			attributes.add(new AttributeDTO("Marca" , String.valueOf(marca)));
			attributes.add(new AttributeDTO("CuartoFrio" ,"-1"));
			
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
	        
			return result;
	     
	    }
}
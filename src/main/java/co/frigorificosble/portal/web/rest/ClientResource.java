package co.frigorificosble.portal.web.rest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
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
import co.frigorificosble.portal.service.dto.LoteDTO;
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
	    
	    /**
	     * GET  /client/{marca}/inventariomarca/{tipoproducto} -> get report inventario marca detallado.
	     */
	    @RequestMapping(value = "/client/{marca}/inventariomarca/{tipoProducto}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]> getReportInventarioMarca(@PathVariable("tipoProducto") String tipoProducto,
	    		@PathVariable("marca") int marca) {
	        log.debug("REST request to get report inventario marca detallado : {}, {}", tipoProducto,marca);
	        ReportDTO reportDTO = new ReportDTO();
	        reportDTO.setReportDataSourceName("InventarioMarcasDetallado");
	    	reportDTO.setResourcePath("Inventario_Marcas_Detallado");
			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("TipoProducto" ,tipoProducto));
			attributes.add(new AttributeDTO("Marca" , String.valueOf(marca)));
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
	        
			return result;
	     
	    }
	    
	    /**
	     * GET  /client/{marca}/rendimientofrio/{tipoProducto}/daterange/{fromDate}/{toDate} ->get report rendimiento frio.
	     */
	    @RequestMapping(value = "/client/{marca}/rendimientofrio/{tipoProducto}/daterange/{fromDate}/{toDate}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]>  getReportRendimientoFrio(@PathVariable("tipoProducto") String tipoProducto,
	    		@PathVariable("marca") int marca,
	    		@PathVariable(value = "fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate fromDate,
	    		@PathVariable(value = "toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate toDate  ) {
	    	log.debug("REST request to get report rendimiento frio : {}, {}", tipoProducto,marca);
	    	
	    	ReportDTO reportDTO = new ReportDTO();
	    	reportDTO.setReportDataSourceName("RendimientoFrio");
	    	reportDTO.setResourcePath("RendimientoFrio");
	    	
	    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
	    	parameters.add(new ParameterDTO("TipoProducto" ,tipoProducto) );
	    	parameters.add(new ParameterDTO("FechaInicial" ,fromDate.format(DateTimeFormatter.ISO_LOCAL_DATE)));
	    	parameters.add(new ParameterDTO("FechaFinal" , toDate.format(DateTimeFormatter.ISO_LOCAL_DATE)));
			reportDTO.setParameters(parameters );
	    	
			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("TipoProducto" ,tipoProducto));
			attributes.add(new AttributeDTO("Marca" , String.valueOf(marca)));
			attributes.add(new AttributeDTO("FechaInicial" ,fromDate.format(DateTimeFormatter.ISO_LOCAL_DATE)));
			attributes.add(new AttributeDTO("FechaFinal" , toDate.format(DateTimeFormatter.ISO_LOCAL_DATE)));
			
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
			return result;
	    }
	    
	    /**
	     * GET  /client/{marca}/lotes/{tipoProducto}/remarca/{isRemarca}/daterange/{fromDate}/{toDate} -> Consulta los lotes del cliente.
	     */
	    @RequestMapping(value = "/client/{marca}/lotes/{tipoProducto}/remarca/{isRemarca}/daterange/{fromDate}/{toDate}",
	        method = RequestMethod.GET,
	        produces =MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public List<LoteDTO>  consultarLotes(@PathVariable("tipoProducto") String tipoProducto,
	    		@PathVariable("marca") int marca,@PathVariable("isRemarca") boolean isRemarca,
	    		@PathVariable(value = "fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate fromDate,
	    		@PathVariable(value = "toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate toDate  ) {
	    	
	    	
	    	return clientService.consultarLotes(tipoProducto, marca, isRemarca, fromDate, toDate.plusDays(1));
	    }
	    
	    /**
	     * GET  /client/porteria/{idLote} -> get report porteria.
	     */
	    @RequestMapping(value = "/client/porteria/{idLote}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]> getReportPorteria(@PathVariable("idLote") int idLote ) {
	        log.debug("REST request to get reporte porteria : {}", idLote);
	        ReportDTO reportDTO = new ReportDTO();
	        reportDTO.setReportDataSourceName("ReportePorteria");
	    	reportDTO.setResourcePath("ReportePorteria");
			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("IdLote" , String.valueOf(idLote)));
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
	        
			return result;
	     
	    }
	    
	    /**
	     * GET  /client/bascula/{idLote} -> get report bascula.
	     */
	    @RequestMapping(value = "/client/bascula/{idLote}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]> getReportBascula(@PathVariable("idLote") int idLote ) {
	        log.debug("REST request to get reporte bascula : {}", idLote);
	        ReportDTO reportDTO = new ReportDTO();
	        reportDTO.setReportDataSourceName("Tickete_Bascula");
	    	reportDTO.setResourcePath("Tickete_Bascula");
			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("IdLote" , String.valueOf(idLote)));
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
	        
			return result;
	     
	    }
	    
	    
	    /**
	     * GET  /client/pesocanal/{idLote}/{tipoProducto} -> get report peso canal.
	     */
	    @RequestMapping(value = "/client/pesocanal/{idLote}/{tipoProducto}",
	        method = RequestMethod.GET,
	        produces = "application/pdf")
	    @Timed
	    public ResponseEntity<byte[]> getReportPesoCanal(@PathVariable("idLote") int idLote,
	    		@PathVariable("tipoProducto") String tipoProducto) {
	        log.debug("REST request to get reporte peso canal : {} ,{}", idLote,tipoProducto);
	        ReportDTO reportDTO = new ReportDTO();
	        reportDTO.setReportDataSourceName("OrdenesSacrifico");
	    	reportDTO.setResourcePath("Peso_Canal_2013");
	    	
	    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
	    	parameters.add(new ParameterDTO("IdLote" ,String.valueOf(idLote)));
			reportDTO.setParameters(parameters );
	    	
			List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
			attributes.add(new AttributeDTO("IdLote" , String.valueOf(idLote)));
			attributes.add(new AttributeDTO("TipoProducto" ,tipoProducto));	
			reportDTO.setAttributes(attributes);
	    	
			ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
	        
			return result;
	     
	    }
}
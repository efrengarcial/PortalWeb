package co.frigorificosble.portal.service;

import static org.assertj.core.api.StrictAssertions.assertThat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import co.frigorificosble.portal.Application;
import co.frigorificosble.portal.service.dto.AttributeDTO;
import co.frigorificosble.portal.service.dto.ClientDTO;
import co.frigorificosble.portal.service.dto.LoteDTO;
import co.frigorificosble.portal.service.dto.ParameterDTO;
import co.frigorificosble.portal.service.dto.ReportDTO;

/**
 * Test class for the UserResource REST controller.
 *
 * @see UserService
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
@Transactional
public class ClientServiceTest {

    @Inject
    private ClientService clientService;

   

    @Test
    @Transactional(readOnly = true)
    public void assertThatClientMustExist() {
    	Optional<ClientDTO> client = clientService.getClient(79296017);
        assertThat(client.isPresent()).isTrue();
    }
    

    @Test
    @Transactional(readOnly = true)
    public void assertThatClientNotExist() {
    	Optional<ClientDTO> client = clientService.getClient(1);
        assertThat(client.isPresent()).isFalse();
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportInvenFrioDetallado() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("InventarioFrioDetallado");
    	reportDTO.setResourcePath("InventarioFrioCuartoFrioDetallado");
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
    	parameters.add(new ParameterDTO("TipoProducto" ,"B") );
		reportDTO.setParameters(parameters );

		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("Marca" ,"-1"));
		attributes.add(new AttributeDTO("CuartoFrio" ,"-1"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportInvenFrioDetalladoLote() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("InventarioFrioDetallado");
    	reportDTO.setResourcePath("InventarioFrioCuartoFrioDetallado");
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
    	parameters.add(new ParameterDTO("TipoProducto" ,"B") );
		reportDTO.setParameters(parameters );

		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("IdLote" ,"171557"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportInvenMarcaDetallado() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("InventarioMarcasDetallado");
    	reportDTO.setResourcePath("Inventario_Marcas_Detallado");
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("Marca" ,"615"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    /*@Test
    @Transactional(readOnly = true)
    public void assertThatReportInvenMarcaDetallado2() {
    	
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("Marca" ,"615"));
		
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }*/
    
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportRendimientoFrio() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("RendimientoFrio");
    	reportDTO.setResourcePath("RendimientoFrio");
    	
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
    	parameters.add(new ParameterDTO("TipoProducto" ,"B") );
    	parameters.add(new ParameterDTO("FechaInicial" ,"2014-01-01"));
    	parameters.add(new ParameterDTO("FechaFinal" ,"2016-04-04"));
		reportDTO.setParameters(parameters );
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("Marca" ,"615"));
		attributes.add(new AttributeDTO("FechaInicial" ,"2014-01-01"));
		attributes.add(new AttributeDTO("FechaFinal" ,"2016-04-04"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportRendimientoFrioLote() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("RendimientoFrio");
    	reportDTO.setResourcePath("RendimientoFrio");
    	
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
    	parameters.add(new ParameterDTO("TipoProducto" ,"B") );
    	reportDTO.setParameters(parameters );
        	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));
		attributes.add(new AttributeDTO("IdLote" ,"170588"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }

    @Test
    @Transactional(readOnly = true)
    public void assertLotesExists() {
    	//http://localhost:2225/api/cliente/615/lotes/B/remarca/true/daterange/2014-01-01/2016-04-04
    	DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE;
    	LocalDate fromDate = LocalDate.parse("2014-01-01", format);
    	LocalDate toDate = LocalDate.parse("2016-04-04", format);
    	
    	List<LoteDTO> lotes= clientService.consultarLotes("B", 615,
    			true, fromDate, toDate);
        assertThat(lotes.size()>0).isTrue();
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportPorteria() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("ReportePorteria");
    	reportDTO.setResourcePath("ReportePorteria");
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("IdLote" ,"719"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportBascula() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("Tickete_Bascula");
    	reportDTO.setResourcePath("Tickete_Bascula");
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("IdLote" ,"719"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReportPesosCanal() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("OrdenesSacrifico");
    	reportDTO.setResourcePath("Peso_Canal_2013");
    	
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;
    	parameters.add(new ParameterDTO("IdLote" ,"719") );
		reportDTO.setParameters(parameters );
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("IdLote" ,"719"));
		attributes.add(new AttributeDTO("TipoProducto" ,"B"));		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    
    @Test
    @Transactional(readOnly = true)
    public void assertThatReciboPieles() {
    	ReportDTO reportDTO = new ReportDTO();
    	reportDTO.setReportDataSourceName("Pieles");
    	reportDTO.setResourcePath("Recibo_Pieles");
    	
    	List<ParameterDTO> parameters =new ArrayList<ParameterDTO>() ;    
		reportDTO.setParameters(parameters );
    	
		List<AttributeDTO> attributes =new ArrayList<AttributeDTO>() ;
		attributes.add(new AttributeDTO("Marca" ,"83"));
		attributes.add(new AttributeDTO("FechaInicial" ,"2014-01-01"));
		attributes.add(new AttributeDTO("FechaFinal" ,"2016-06-04"));
		
		reportDTO.setAttributes(attributes);
    	
		ResponseEntity<byte[]> result = clientService.generateReport(reportDTO);
        assertThat(result.hasBody() == true);
    }
    

    @Test
    @Transactional(readOnly = true)
    public void assertListaSacrificoExists() {
    	DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE;
    	LocalDate fromDate = LocalDate.parse("2014-01-01", format);
    	LocalDate toDate = LocalDate.parse("2016-04-04", format);
    	
    	List<LoteDTO> lotes= clientService.consultarListaSacrificios( "B", 83, fromDate, toDate);
        assertThat(lotes.size()>0).isTrue();
    }
    
}

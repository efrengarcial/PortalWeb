package co.frigorificosble.portal.service;

import static org.assertj.core.api.StrictAssertions.assertThat;

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


}

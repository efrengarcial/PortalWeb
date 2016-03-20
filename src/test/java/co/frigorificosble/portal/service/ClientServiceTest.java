package co.frigorificosble.portal.service;

import static org.assertj.core.api.StrictAssertions.assertThat;

import java.util.Optional;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import co.frigorificosble.portal.Application;
import co.frigorificosble.portal.service.dto.ClientDTO;

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


}

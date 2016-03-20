package co.frigorificosble.portal.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client; 

@Configuration
@EnableOAuth2Client
public class OAuthClientConfiguration {

	  		  
	 	@Value("${oauth.token:http://localhost:2225/token}")
	    private String accessTokenUri;
	 
	    //@Value("${userAuthorizationUri}")
	    //private String userAuthorizationUri;
	 
	    @Value("${clientID:414e1927a3884f68abc79f7283837fd1}")
	    private String clientID;
	 
	    @Value("${clientSecret:qMCdFDQuF23RV1Y-1Gq9L3cF3VmuFwVbam4fMTdAfpo}")
	    private String clientSecret;
	    
	    @Autowired(required = false)
		ClientHttpRequestFactory clientHttpRequestFactory;
	 
	    @Bean
	    public OAuth2ProtectedResourceDetails resource() {
	    	/*ResourceOwnerPasswordResourceDetails resource = new ResourceOwnerPasswordResourceDetails();
	    	resource.setId("reddit");
	    	resource.setClientId(clientID);
	    	resource.setClientSecret(clientSecret);
	    	resource.setAccessTokenUri(accessTokenUri);
	    	resource.setTokenName("oauth_token");
	    	resource.setGrantType("password");
	    	resource.setScope(Arrays.asList("identity"));
	    	resource.setUsername("efren.gl@gmail.com");
			resource.setPassword("Passw0rd");*/
	    	
	    	ClientCredentialsResourceDetails resource = new ClientCredentialsResourceDetails();
	    	resource.setId("ASP.NET Identity");
	    	resource.setClientId(clientID);
	    	resource.setClientSecret(clientSecret);
	    	resource.setAccessTokenUri(accessTokenUri);
	    	resource.setTokenName("oauth_token");
	    	resource.setGrantType("client_credentials");
	    	resource.setScope(Arrays.asList("read", "write"));
	        
	        return resource;
	    }
	    
	    /*
		 * ClientHttpRequestFactory is autowired and checked in case somewhere in
		 * your configuration you provided {@link ClientHttpRequestFactory}
		 * implementation Bean where you defined specifics of your connection, if
		 * not it is instantiated here with {@link SimpleClientHttpRequestFactory}
		 */
		private ClientHttpRequestFactory getClientHttpRequestFactory() {
			if (clientHttpRequestFactory == null) {
				clientHttpRequestFactory = new SimpleClientHttpRequestFactory();
			}
			return clientHttpRequestFactory;
		}

	    
	    @Bean
		public AccessTokenProvider clientAccessTokenProvider() {
			ClientCredentialsAccessTokenProvider accessTokenProvider = new ClientCredentialsAccessTokenProvider();
			accessTokenProvider.setRequestFactory(getClientHttpRequestFactory());
			return accessTokenProvider;
		}
	    
	    @Bean
	    public OAuth2RestOperations restTemplate() {
	    	HttpHeaders headers = new HttpHeaders();
	    	headers.setContentType( MediaType.APPLICATION_JSON );
	    	
	    	OAuth2RestTemplate template = new OAuth2RestTemplate(resource(), new DefaultOAuth2ClientContext(
					new DefaultAccessTokenRequest()));
	    	template.setAccessTokenProvider(clientAccessTokenProvider());
			return template;
		}
		
}

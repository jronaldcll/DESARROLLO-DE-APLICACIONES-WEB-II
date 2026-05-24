package com.cibertec.salesservices.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

// @Configuration registra beans de infraestructura en Spring.
// En AWS esto equivale a declarar recursos de streaming con IaC, por ejemplo un stream de Kinesis.
@Configuration
public class KafkaTopicConfig {

	public static final String STOCK_MOVEMENTS_TOPIC = "stock-movements";

	// @Bean publica un objeto administrado por Spring.
	// En AWS sería similar a definir el stream o tópico como recurso compartido para otros componentes.
	@Bean
	public NewTopic stockMovementsTopic() {
		return TopicBuilder.name(STOCK_MOVEMENTS_TOPIC)
				.partitions(3)
				.replicas(1)
				.build();
	}
}

package com.cibertec.mspedidos.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @Configuration registra beans de infraestructura AMQP.
// En AWS esto se parece a declarar SNS/SQS y suscripciones mediante IaC.
@Configuration
@ConditionalOnProperty(name = "messaging.rabbitmq.enabled", havingValue = "true")
public class RabbitMQConfig {

	public static final String STOCK_EXCHANGE = "stock-exchange";
	public static final String NOTIFICATION_EXCHANGE = "notification-exchange";
	public static final String STOCK_RESERVE_QUEUE = "stock-reserve-queue";
	public static final String STOCK_LOW_QUEUE = "stock-low-queue";
	public static final String PURCHASE_EMAIL_QUEUE = "purchase-email-queue";
	public static final String STOCK_RESERVE_ROUTING_KEY = "stock.reserve";
	public static final String STOCK_LOW_ROUTING_KEY = "stock.low";
	public static final String PURCHASE_EMAIL_ROUTING_KEY = "email.purchase.thanks";

	// @Bean crea el Exchange que enruta mensajes.
	// En AWS su equivalente conceptual es un topic de SNS.
	@Bean
	@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
	public DirectExchange stockExchange() {
		return new DirectExchange(STOCK_EXCHANGE);
	}

	@Bean
	public DirectExchange notificationExchange() {
		return new DirectExchange(NOTIFICATION_EXCHANGE);
	}

	// @Bean crea la cola donde ms-notificaciones consumirá reservas.
	// En AWS esto equivale a una cola SQS suscrita a un tópico.
	@Bean
	@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
	public Queue stockReserveQueue() {
		return new Queue(STOCK_RESERVE_QUEUE);
	}

	// @Bean crea la cola de alertas de stock bajo.
	// En AWS esto sería otra cola SQS para otro consumidor.
	@Bean
	@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
	public Queue stockLowQueue() {
		return new Queue(STOCK_LOW_QUEUE);
	}

	@Bean
	public Queue purchaseEmailQueue() {
		return new Queue(PURCHASE_EMAIL_QUEUE);
	}

	// El Binding conecta la cola con el exchange mediante una routing key.
	// En AWS esto se parece a la regla de suscripción/filtro entre SNS y SQS.
	@Bean
	@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
	public Binding stockReserveBinding(Queue stockReserveQueue, DirectExchange stockExchange) {
		return BindingBuilder.bind(stockReserveQueue)
				.to(stockExchange)
				.with(STOCK_RESERVE_ROUTING_KEY);
	}

	@Bean
	@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
	public Binding stockLowBinding(Queue stockLowQueue, DirectExchange stockExchange) {
		return BindingBuilder.bind(stockLowQueue)
				.to(stockExchange)
				.with(RabbitMQConfig.STOCK_LOW_ROUTING_KEY);
	}

	@Bean
	public Binding purchaseEmailBinding(Queue purchaseEmailQueue, DirectExchange notificationExchange) {
		return BindingBuilder.bind(purchaseEmailQueue)
				.to(notificationExchange)
				.with(RabbitMQConfig.PURCHASE_EMAIL_ROUTING_KEY);
	}

	// Este converter serializa records a JSON para RabbitMQ.
	// En AWS esto sería equivalente a publicar payloads JSON legibles en SNS/SQS.
	@Bean
	public MessageConverter jsonMessageConverter() {
		return new Jackson2JsonMessageConverter();
	}
}

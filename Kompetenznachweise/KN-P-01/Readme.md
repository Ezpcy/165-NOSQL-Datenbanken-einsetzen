# KN-P-01: Installation von Prometheus und Grafana

## A) Installation

### Prometheus Node-Exporter Metrics:

![](image/Pasted%20image%2020250322161754.png)

_Abbildung 1: Prometheus Node-Exporter Metrics_

### Prometheus Dashboard:

![](image/Pasted%20image%2020250322161548.png)

_Abbildung 2: Prometheus Dashboard_

### Grafana Dashboard:

![](image/Pasted%20image%2020250322161819.png)

_Abbildung 3: Grafana Dashboard_

### Grafana Metrics für Prometheus

![](image/Pasted%20image%2020250322161906.png)

_Abbildung 4: Grafana Metrics_

## B) Erklärungen Cloud-Init

### 1. Was sind Scrapes in Prometheus?

In Prometheus werden die Daten von den Endpunkten (Scrapes) abgerufen und in der Datenbank gespeichert. Die Daten werden in einem Zeitintervall abgerufen und in der Datenbank gespeichert. 

Prometheus ist ein "Pull-basiertes" System, das bedeutet, dass Prometheus die Daten von den Endpunkten abruft. 

Beispiel aus der gegebenen cloud-init Datei:

```yaml
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['localhost:9090']
  - job_name: node
    static_configs:
      - targets: ['localhost:9100']
```

 - `job_name: prometheus` 
	 - Anweisung, sich selbst zu überwachen, indem es Metriken von `localhost:9090` abruft.
  - `job_name: node`
	  - Anweisung, Metriken von `localhost:9100` abzurufen. Hier liegt der Node Exporter.


### 2. Was sind Rules in Prometheus?

Regeln in Prometheus sind die Regeln, die definiert werden, um die Metriken zu verarbeiten und die Alarme zu generieren. 

Es gibt zwei Arten von Regeln:

1. **Recording Rules:**
	- Diese Regeln werden verwendet, um neue Metriken zu erstellen. 
	- Erlauben die effiziente Aggregation und Optimierung von Abfragen
2. **Alerting Rules:**
  - Diese Regeln werden verwendet, um Alarme zu generieren, wenn bestimmte Bedingungen erfüllt sind.

Beispiel aus der gegebenen cloud-init Datei:

```yaml
  - name: alert_rules
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} down"
          description: "Instance {{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."
```

- Die Regel `InstanceDown` wird ausgelöst, wenn die Bedingung `up == 0` erfüllt ist.

### Wie speicher man eigene Daten in Prometheus?

#### Schritt 1: Eigene Anwendung mit Prometheus-Metriken erweitern

- Anwendung muss eine HTTP-Schnittstelle mit `/metrics` bereitstellen.
- Bibliotheken wie `prometheus/client_golang` oder `prometheus/client_python` können verwendet werden, um Metriken zu erstellen.

#### Schritt 2: Konfiguration von Prometheus

Prometheus Scraping so konfigurieren, dass es die Metriken von der Anwendung abruft.

```yaml
scrape_configs:
  - job_name: 'my_custom_app'
    static_configs:
      - targets: ['localhost:8000']
```

#### Schritt 3: Regeln für die Metriken erstellen

Falls man Werte speichern möchte:

```yaml
groups:
  - name: my_custom_rules
    rules:
      - record: avg_temperature_last_5m
        expr: avg(rate(custom_temperature_celsius[5m]))
```

#### Schritt 4: Alarme für die Metriken erstellen

```yaml
groups:
  - name: alert_rules
    rules:
      - alert: HighTemperature
        expr: custom_temperature_celsius > 28
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High Temperature Alert"
          description: "Temperature is above 28°C for more than 5 minutes."
```

- Falls die Temperatur über 28°C für mehr als 5 Minuten liegt, wird ein Warn Alarm ausgelöst.

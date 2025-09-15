# api-gateway/kong/Dockerfile
FROM kong:3.3

# Copy file config (nếu có custom)
COPY kong.conf /etc/kong/kong.conf

# Expose port (proxy + admin)
EXPOSE 8000 8443 8001 8444

CMD ["kong", "docker-start"]
package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/rawagner/abb-go-proxy/websocketproxy"
)

func main() {
	router := chi.NewRouter()
	fs := http.FileServer(http.Dir("../frontend/build"))
	indexHandler := func(rw http.ResponseWriter, req *http.Request) {
		http.ServeFile(rw, req, filepath.Join("../frontend/build", "index.html"))
	}

	procUrl, err := url.Parse(os.Getenv("PROCESSOR_SERVICE"))
	if err != nil {
		log.Fatalln(err)
	}
	wsProxy := websocketproxy.NewProxy(procUrl)

	configsUrl, err := url.Parse(os.Getenv("ENGINEERING_SERVICE"))
	if err != nil {
		log.Fatalln(err)
	}
	handler := func(rw http.ResponseWriter, req *http.Request) {
		req.Host = configsUrl.Host
		req.URL.Host = configsUrl.Host
		req.URL.Scheme = configsUrl.Scheme
		req.URL.Path = strings.Replace(req.URL.Path, "/api/configurations", "", 1)
		req.RequestURI = ""

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		rw.WriteHeader(resp.StatusCode)
		io.Copy(rw, resp.Body)
	}

	router.Handle("/", fs)
	router.Handle("/static/*", fs)
	router.HandleFunc("/dashboard", indexHandler)
	router.HandleFunc("/configs", indexHandler)
	router.HandleFunc("/api/configurations", handler)
	router.HandleFunc("/api/configurations/*", handler)
	router.Handle("/api/metrics", wsProxy)

	var tlsCertFile string
	var tlsKeyFile string

	flag.StringVar(&tlsCertFile, "tls-cert-file", "", "TLS certificate for proxy")
	flag.StringVar(&tlsKeyFile, "tls-private-key-file", "", "TLS private key for proxy")
	flag.Parse()

	server := &http.Server{Addr: ":3000", Handler: router}
	if tlsCertFile != "" && tlsKeyFile != "" {
		fmt.Println("running in HTTPS mode")
		err = server.ListenAndServeTLS(tlsCertFile, tlsKeyFile)
	} else {
		fmt.Println("running in HTTP mode")
		err = server.ListenAndServe()
	}

	if err != nil {
		log.Fatalln(err)
	}
	log.Println("proxy started")
}

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nastiprazdnik - Gallery</title>
    <link rel="stylesheet" href="../css/style.min.css" />
    <link rel="shortcut icon" href="../img/favicon.png" type="image/png">
</head>

<body class="gallery gallery-album">
    <script src="../js/loadIcon.js"></script>

    <a href="../gallery" class="main-page-link"></a>

    <section class="gallery-album__album">
        <?php
$names = glob($_SERVER['DOCUMENT_ROOT'] . "/img/gallery/" . $_GET['album'] . "*");
$index = 0;
foreach ($names as $st) {?>
        <div class="gallery-album__photo photo" data-src="/img/gallery/<?=$_GET['album'] . basename($st)?>"
             data-index="<?=$index++?>">
        </div>
        <?php }?>
    </section>

    <div class="overlay"></div>
    <div class="modal-photo">
        <button class="modal-photo__btn modal-photo__btn--prev" data-direction="-1"></button>
        <button class="modal-photo__btn modal-photo__btn--next" data-direction="1"></button>
        <div class="modal-photo__blur"></div>
    </div>

    <script src='../js/lazyLoad.js'></script>
    <script type="module" src="../js/galleryAlbum.js"></script>
</body>

</html>
<?php

namespace App\Filament\Resources\DataSubmissions\Pages;

use App\Filament\Resources\DataSubmissions\DataSubmissionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDataSubmissions extends ListRecords
{
    protected static string $resource = DataSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
